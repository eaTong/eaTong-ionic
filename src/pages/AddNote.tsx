import React, { Component } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonPage, IonTextarea,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonInput,
  IonLabel
} from "@ionic/react";
import { PagePropsInterface } from "../utils/PagePropsInterface";
import ajax from "../utils/ajax";

class AddNote extends Component<PagePropsInterface, {}> {
  state = {
    note: '',
    reference: '',
    source: '',
  };

  async saveNote() {
    const { note, reference, source } = this.state;
    await ajax({ url: '/api/note/add', data: { reference, source, title: note.slice(0, 20), content: note } });
    this.props.history.goBack();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>添加笔记</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => this.saveNote()}>保存</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel>来源</IonLabel>
            <IonInput
              placeholder="来源。。。"
              value={this.state.source}
              required
              onIonChange={(val: any) => this.setState({ source: val.target.value })}
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              placeholder="笔记内容。。。"
              autoGrow
              value={this.state.note}
              rows={4}
              required
              onIonChange={(val: any) => this.setState({ note: val.target.value })}
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              placeholder="引用。。。"
              autoGrow
              value={this.state.reference}
              rows={4}
              required
              onIonChange={(val: any) => this.setState({ reference: val.target.value })}
            />
          </IonItem>
        </IonContent>
      </IonPage>
    )
  }
}

export default AddNote;
