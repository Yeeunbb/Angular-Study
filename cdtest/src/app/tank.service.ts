import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import Tank from './models/tank.model';


@Injectable({
  providedIn: 'root'
})
export class TankService {

  fishFarmsRef: AngularFirestoreCollection<Tank> = null;

  constructor(private db: AngularFirestore) { 
    this.fishFarmsRef = db
      .collection('/groups')
      .doc('ncQoNWSPu5RgjCoe5Td5')
      .collection('fishFarms')
      .doc('QR2QqWiFlarZCaecisOo')
      .collection('moanas');
      console.log(this.fishFarmsRef.get());
  }

  createTank(tank: Tank): void {
    this.fishFarmsRef.add({...tank});
  }

  updateTank(id: string, data: any): Promise<void> {
    return this.fishFarmsRef.doc(id).update(data);
  }

  deleteTank(id: string): Promise<void> {
    return this.fishFarmsRef.doc(id).delete();
  }

  getTankList(): AngularFirestoreCollection<Tank>{
    return this.fishFarmsRef;
  }

  getTank(id: string) {
    return this.fishFarmsRef.doc(id).valueChanges();
  }
}
