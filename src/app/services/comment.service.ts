import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private fireStore: AngularFirestore
  ) { }

  commentDo(comment: Comment) {
    const comments = this.fireStore.collection("comments")
    return comments.add(comment);
  }

  getCommentsByProductId(id: String): Observable<any> {
    let comments: any[] = []
    const subject = new Subject<any>();
    const getComments = this.fireStore.collection("comments").get().subscribe(doc => {
      doc.forEach(d => {
        comments.push(Object.assign({ id: d.id }, d.data()))
      })
      subject.next(comments.filter(x=>x.productId==id))
    })
    return subject.asObservable();
  }
}
