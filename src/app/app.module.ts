import { BrowserModule, TransferState, StateKey, makeStateKey, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphaComponent } from './live/live.component';
import { MessageComponent } from './live/message/message.component';
import { ImageComponent } from './live/image/image.component';
import { IndexComponent } from './index/index.component';
import { ChatRendererComponent } from './live/chat-renderer/chat-renderer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LegacyPaidMessageComponent } from './live/paid-message/paid-message.component';
import { ViewerComponent } from './viewer/viewer.component';
import { IndexLocalComponent } from './index-local/index-local.component';
import { Observable } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient, state: TransferState) {
  return {
    getTranslation: (lang: string) => {
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      const data = state.get(key, null);

      // 检查transfer-state是否存在传入语言的语言包内容, 不存在则请求相应的语言包资源
      if (data) {
        return new Observable(observer => {
          observer.next(data);
          observer.complete();
        });
      } else {
        // 使用网络请求获取语言包资源
        return new TranslateHttpLoader(http).getTranslation(lang);
      }
    }
  } as TranslateLoader;
}

@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    MessageComponent,
    ImageComponent,
    IndexComponent,
    ChatRendererComponent,
    LegacyPaidMessageComponent,
    ViewerComponent,
    IndexLocalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, TransferState]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
