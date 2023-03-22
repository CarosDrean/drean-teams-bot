// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
    ActivityHandler,
    MessageFactory,
    CardFactory,
    InvokeResponse
} from 'botbuilder';
import {Template} from 'adaptivecards-templating'
import {OpenAi} from "./openai";
import CardListTeam from './resources/cardListTeam.json';
import {Team} from "./inertfaces/team";
import CardSummary from "./resources/summaryCard.json";
import CardCancel from "./resources/cancelCard.json";
import NotImplementCard from "./resources/notImplementCard.json";
import {OpenAiFineTuning} from "./openaidavinci";

export class EchoBot extends ActivityHandler {
    openai: OpenAi
    openaiFine: OpenAiFineTuning
    teams: Team[] = []

    constructor() {
        super();
        this.openai = new OpenAi()
        this.openaiFine = new OpenAiFineTuning()

        this.onMessage(async (context, next) => {
            console.log(context.activity.text)

            let response: string;
            // if (context.activity.text.includes('solicitud')) {
            //     response = await this.openaiFine.SendMessage(context.activity.text)
            // } else {
            response = await this.openai.SendMessage(context.activity.text)
            // }
            console.log(response)

            const jsonIndex = response.indexOf("JSON:");
            if (jsonIndex !== -1) {
                const jsonString = response.substring(jsonIndex + 5, response.lastIndexOf("]") + 1);
                console.log(jsonString)

                if (jsonString !== "") {
                    await context.sendActivity({attachments: [this.createAdaptiveCardListTeam(JSON.parse(jsonString))]});
                    this.openai = new OpenAi()
                } else {
                    await context.sendActivity(MessageFactory.text(response, response));
                }

                return
            }

            await context.sendActivity(MessageFactory.text(response, response));

            // try {
            //     const jsonList = JSON.parse(response)
            //     console.log(jsonList)
            //     this.openai = new OpenAi()
            //
            //     await context.sendActivity({attachments: [this.createAdaptiveCardListTeam(jsonList)]});
            //     return
            // } catch (e) {
            //     await context.sendActivity(MessageFactory.text(response, response));
            // }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Bienvenido!';
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    //await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    async onInvokeActivity(context): Promise<InvokeResponse> {
        if (context.activity.name != 'adaptiveCard/action') {
            return
        }

        const data = context.activity.value.action.data

        const verb = context.activity.value.action.verb
        if (verb === 'cancelCard') {
            await context.updateActivity({
                type: 'message',
                id: context.activity.replyToId,
                attachments: [this.createCancelCard()]
            })
        }

        if (verb === 'summaryCard') {
            await context.updateActivity({
                type: 'message',
                id: context.activity.replyToId,
                attachments: [this.createSummaryCard(data)]
            })
        }

        if (verb === 'sendEmail') {
            await context.updateActivity({
                type: 'message',
                id: context.activity.replyToId,
                attachments: [this.createNotImplementCard()]
            })
        }

        this.teams = []

        return ActivityHandler.createInvokeResponse();
    }

    private createSummaryCard(data: { [key: string]: string }) {
        // console.log(CardSummary)

        const selects: Team[] = [];

        for (const [key, value] of Object.entries(data)) {
            this.teams.forEach((team) => {
                if (team.id === key && (value.toLowerCase() === 'true')) {
                    selects.push(team)
                }
            })
        }

        const template = new Template(CardSummary)
        const card = template.expand({
            $root: {
                selectedList: selects,
            }
        })

        return CardFactory.adaptiveCard(card);
    }

    private createCancelCard() {
        return CardFactory.adaptiveCard(CardCancel);
    }

    private createNotImplementCard() {
        return CardFactory.adaptiveCard(NotImplementCard);
    }

    private createAdaptiveCardListTeam(list: Team[]) {
        // console.log(CardListTeam)

        const recommendationList: Team[] = []
        const otherList: Team[] = []
        const viewMoreList: Team[] = []

        list.forEach((team, i) => {
            team.id = i.toString()
            this.teams.push(team)

            if (team.score > 60) {
                team.value = true
                recommendationList.push(team)
                return
            }

            if (team.score < 20) {
                viewMoreList.push(team)
                return;
            }

            otherList.push(team)
        })

        const template = new Template(CardListTeam)
        const card = template.expand({
            $root: {
                recommendationList: recommendationList,
                otherList: otherList,
                viewMoreList: viewMoreList
            }
        })

        return CardFactory.adaptiveCard(card);
    }
}
