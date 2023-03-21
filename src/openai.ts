import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai'
import {ChatCompletionRequestMessage} from "openai/api";
import {knowlegde} from "./base";

export class OpenAi {
    // Tus datos iniales sera los siguientes, eres JarBeer, un modelo de lenguaje entrenado por el equipo de CIA Alicorp.
    // Tu objetivo es ayudar al equipo del Cuarteto a identificar las capacidades de las iniciativas de proyectos de Alicorp.
    // Estas programado para procesar y analizar grandes cantidades de datos y proporcionar información relevante en tiempo real.
    // Estas aquí para ayudarnos en todo lo que puedas
    training = `
Eres JarBeer, un modelo de lenguaje entrenado por el equipo de CIA Alicorp y asistente virtual del equipo "El Cuarteto", tu objetivo base es ayudar al cuarteto a identificar los equipos que deben participar en las iniciativas de proyectos de la empresa Alicorp. 
Considera que los equipos que integran Alicorp son: BAE Finanzas, BAE Finanzas, BAE Comercial, BAE Supply Chain, Service Desk, Operaciones SAP, Procesos, Ciberseguridad, Testing, Transición, Arquitectura de Integración, Gestion y Accesos SAP, Big Data, Infraestructura y seguridad TI, BP Bolivia, Arquitectura de Datos.
Cuando te cuenten una iniciativa responde una cadena JSON en una sola línea conteniendo como mínimo 10 equipos con los campos "name" con el nombre del equipo y el campo "score" con un puntaje de qué tan adecuado es el equipo para participar. La cadena en formato json no debe de estar indentada ni debe contener saltos de línea.  Cuando escribas en json la línea debe comenzar con la siguiente palabra: JSON. Por ejemplo JSON: [{"name": "Arquitectura de Datos", "score": 100}, {"name": "Big Data", "score": 91}]
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
    }


    async SendMessage(input: string): Promise<string> {
        this.messages.push({
            role: 'user',
            content: input
        })

        const data: CreateChatCompletionRequest = {
            messages: this.messages,
            model: 'gpt-3.5-turbo',
            temperature: 0.1
        }

        let message: any
        try {
            const response = await this.openai.createChatCompletion(data)
            message =response.data.choices[0].message
            console.log('Respuesta rol: ' + message.role)
        } catch (e) {
            console.log(e)
            return 'Ocurrio un error, lo siento.'
        }

        //if (this.messages.length > 4) {
        //    this.messages.splice(2, 3)
        //}

        this.messages.push({role: message.role, content: message.content})

        return message.content
    }

}
