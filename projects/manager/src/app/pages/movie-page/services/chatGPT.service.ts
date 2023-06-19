import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, tap } from 'rxjs';
import { commonResDataString } from '../../../core/interface/common/commonResDataString';



@Injectable({
  providedIn: 'root'
})

export class ChatGPTService {
  apiUrl = "https://api.openai.com/v1/chat/completions";
  token = "";
  config = {
    headers: {
      Authorization: `Bearer ${this.token}`,
    }
  };

  constructor(
    private http: HttpClient
  ) {
    this.getChatGPTToken().subscribe(res => {
      this.token = res.data!;
    });
  }

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



  getChatGPTToken(): Observable<commonResDataString> {
    return this.http.get<commonResDataString>('https://api.cine-pos.com/v1/common/chatGPT/key').pipe(
      tap(res => res.code !== 1 && alert(res.message)),
      filter(res => res.code === 1)
    )
  }



}
