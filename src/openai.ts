import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai'
import {ChatCompletionRequestMessage} from "openai/api";
import {knowlegde} from "./base";

export class OpenAi {
    training = `
        Tus datos iniales sera los siguientes, eres ChatGPT-CIA, un modelo de lenguaje entrenado por el equipo de CIA Alicorp, 
        tu objetivo base es ayudar al equipo de los 4 a definir repartir mejor las iniciativas de proyectos Alicorp.
        
        Aqui te paso un csv con 2 columnas INPUT y RESULTADO, con la data de input se esta llegando al resultado.
        En las celda RESULTADO se esta dando una lista de equipos que se encargan de realizar la iniciativa de su respectivo INPUT.
        Te hare preguntas relacionadas a la data de INPUT y necesito obtener un score para cada equipo.
        
        Lo primero que debes hacer es poner todos estos equipos: BAE Finanzas, BAE Comercial, BAE Supply, Service Desk, Operaciones SAP,  Procesos, en el campo team del json de ejemplo que esta mas adelante.
        Luego de eso le asignas un score de acuerdo al INPUT
        No pongas mas texto, solo ese json; a menos que la pregunta no sea algo sobre el input.
        
        el formato requeriso es el siguiente:
        
        [
          {
            "team": "Bae finanzas",
            "score": 100
          }
        ]
        
        Aqui esta la data:
        ${knowlegde}   
    `

    messages: Array<ChatCompletionRequestMessage>

    configuration = new Configuration({
        apiKey: process.env.OpenAiApiKey,
    });

    openai = new OpenAIApi(this.configuration);

    constructor() {
        // this.readCsv()

        this.messages = new Array<ChatCompletionRequestMessage>()

        const initialMessage: ChatCompletionRequestMessage = {
            role: 'assistant',
            content: this.training
        }

        this.messages.push(initialMessage)
        this.messages.push({role: 'assistant', content: 'Por favor muestra todos los equipos, todos con su score, sin mas texto'})
    }


    async SendMessage(input: string): Promise<string> {
        // return '[\n  {\n    "name": "BAE Comercial",\n    "score": 100\n  },\n  {\n    "name": "BAE Supply",\n    "score": 90\n  },\n  {\n    "name": "Service Desk",\n    "score": 80\n  },\n  {\n    "name": "Operaciones SAP",\n    "score": 80\n  },\n  {\n    "name": "Procesos",\n    "score": 70\n  },\n  {\n    "name": "Ciberseguridad",\n    "score": 50\n  },\n  {\n    "name": "Testing",\n    "score": 70\n  },\n  {\n    "name": "Transición",\n    "score": 50\n  },\n  {\n    "name": "Arquitectura de Integración",\n    "score": 50\n  }\n]'
        this.messages.push({
            role: 'user',
            content: input
        })

        if (this.messages.length > 15) {
            this.messages.splice(3, 10)
        }

        const data: CreateChatCompletionRequest = {
            messages: this.messages,
            model: 'gpt-3.5-turbo'
        }

        let message: any
        try {
            const response = await this.openai.createChatCompletion(data)
            message =response.data.choices[0].message
        } catch (e) {
            console.log(e)
            return 'Ocurrio un error, lo siento.'
        }


        this.messages.push({role: message.role, content: message.content})

        return message.content
    }

}
