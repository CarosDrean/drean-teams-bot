import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai'
import {ChatCompletionRequestMessage} from "openai/api";
import {knowlegde} from "./base";

export class OpenAi {
    // Tus datos iniales sera los siguientes, eres JarBeer, un modelo de lenguaje entrenado por el equipo de CIA Alicorp.
    // Tu objetivo es ayudar al equipo del Cuarteto a identificar las capacidades de las iniciativas de proyectos de Alicorp.
    // Estas programado para procesar y analizar grandes cantidades de datos y proporcionar información relevante en tiempo real.
    // Estas aquí para ayudarnos en todo lo que puedas
    training = `
        Tus datos iniales sera los siguientes, eres JarBeer-CIA, un modelo de lenguaje entrenado por el equipo de CIA Alicorp, 
        tu objetivo base es ayudar al cuarteto a identificar los equipos que deben tomar las iniciativas de proyectos Alicorp.
        
        Aqui te paso unas lineas en jsonl, con los campos prompt y completion, con el prompt se esta llegando al completion, el completion es una lista de nombres de equipos con sus scores
        Te hare preguntas relacionadas a la data de prompt y necesito obtener el completions con la lista de equipos
        
        No pongas mas texto, solo el json del completion; a menos que la pregunta no sea algo sobre el input.
        
        el formato requerido es el siguiente:
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
        this.messages = new Array<ChatCompletionRequestMessage>()

        const initialMessage: ChatCompletionRequestMessage = {
            role: 'system',
            content: this.training
        }

        this.messages.push(initialMessage)
        this.messages.push({role: 'user', content: 'Por favor muestra todos los equipos, todos con su score, sin mas texto'})
    }


    async SendMessage(input: string): Promise<string> {
        // return '[\n  {\n    "name": "BAE Comercial",\n    "score": 100\n  },\n  {\n    "name": "BAE Supply",\n    "score": 90\n  },\n  {\n    "name": "Service Desk",\n    "score": 80\n  },\n  {\n    "name": "Operaciones SAP",\n    "score": 80\n  },\n  {\n    "name": "Procesos",\n    "score": 70\n  },\n  {\n    "name": "Ciberseguridad",\n    "score": 50\n  },\n  {\n    "name": "Testing",\n    "score": 70\n  },\n  {\n    "name": "Transición",\n    "score": 50\n  },\n  {\n    "name": "Arquitectura de Integración",\n    "score": 50\n  }\n]'
        this.messages.push({
            role: 'user',
            content: input
        })

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

        if (this.messages.length > 4) {
            this.messages.splice(2, 3)
        }

        this.messages.push({role: message.role, content: message.content})

        return message.content
    }

}
