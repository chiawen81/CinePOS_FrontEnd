import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'projects/manager/src/environments/environment';



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
    console.log('openApiRequest- message', message);

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
