import { Configuration, OpenAIApi } from 'openai'

export class OpenAiFineTuning {
    training = `
        Tus datos iniales sera los siguientes, eres ChatGPT-CIA, un modelo de lenguaje entrenado por el equipo de CIA Alicorp, 
        tu objetivo base es ayudar al equipo de los 4 a definir repartir mejor las iniciativas de proyectos Alicorp.
        
        el formato requeriso es el siguiente:
        
        [
          {
            "team": "Bae finanzas",
            "score": 100
          }
        ]  
    `

    configuration = new Configuration({
        apiKey: process.env.OpenAiApiKey,
    });

    openai = new OpenAIApi(this.configuration);

    constructor() {
    }

    async SendMessage(input: string): Promise<string> {
        // davinci:ft-personal-2023-03-21-02-55-58
        // ft-IuMEqmd8dVx9JZ4mzlhRPYPT
        try {
            const response = await this.openai.createCompletion({
                model: 'davinci:ft-personal-2023-03-21-02-55-58',
                prompt: input
            })

            console.log(response)

            return response.data.choices[0].text
        } catch (e) {
            console.log(e)
            return 'Ocurrio un error, lo siento.'
        }

    }

}
