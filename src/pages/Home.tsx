import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher, IonRefresherContent
} from '@ionic/react';
import React, {Component} from 'react';
import ajax from '../utils/ajax';
import {add} from 'ionicons/icons';
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {RefresherEventDetail} from '@ionic/core';

class Home extends Component<PagePropsInterface, {}> {
  state = {
    loading: true,
    notes: [],
  };

  async componentDidMount() {
    await ajax({url: '/api/user/login', data: {account: 'eaTong', password: 'eaTong123'}});
    await this.getNotes();
    this.toggleLoading(false);
  }

  async getNotes(event?: CustomEvent<RefresherEventDetail>) {
    const noteResult = await ajax({url: '/api/note/get'});
    this.setState({notes: noteResult.list});
    if (event) event.detail.complete();
  }

  toggleLoading(loading: Boolean): void {
    this.setState({loading: loading})
  }

  async deleteNote(note: any) {
    await ajax({url: '/api/note/delete', data: {ids: [note.id]}});
    this.getNotes();
  }

  renderNotes() {
    return this.state.notes.map((note: any) => (
      <IonItemSliding key={note.id}>
        <IonItem>
          <IonLabel>{note.title}</IonLabel>
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption color='primary' onClick={() => null}>编辑</IonItemOption>
          <IonItemOption color='danger' onClick={() => this.deleteNote(note)}>删除</IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    ))
  }

  render() {
    const {loading} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>eaTong个人站</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={(event) => this.getNotes(event)}>
            <IonRefresherContent>
            </IonRefresherContent>
          </IonRefresher>

          <IonLoading
            isOpen={loading}
            onDidDismiss={() => this.toggleLoading(false)}
            message={'自动登录中...'}
            duration={5000}
          />
          <IonList>
            {this.renderNotes()}
          </IonList>
        </IonContent>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => this.props.history.push('/add-note')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonPage>
    );
  }
}

export default Home;
