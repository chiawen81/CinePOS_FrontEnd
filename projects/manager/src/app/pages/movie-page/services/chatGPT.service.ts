import { Injectable } from '@angular/core';
import axios from 'axios';



@Injectable({
  providedIn: 'root'
})

export class ChatGPTService {
  apiUrl = "https://api.openai.com/v1/chat/completions";
  token = "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";
  config = {
    headers: {
      Authorization: `Bearer ${this.token}`,
    }
  };

  getAdvice = async (message: {
    role: string,
    content: string
  }[]) => {
    console.log('openApiRequest')

    try {
      const { data } = await axios.post(
        this.apiUrl,
        {
          messages: message,
          model: "gpt-3.5-turbo",
          max_tokens: 500,
        },
        this.config
      );
      console.log('openAiRequest', data);
      return data;

    } catch (err) {
      console.log(err);
    };
  }



}
