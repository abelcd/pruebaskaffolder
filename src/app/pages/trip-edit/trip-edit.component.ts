/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5db9c009c6ce4c4de2ba31c9
*
* You will get 10% discount for each one of your friends
* 
*/
// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { TripService } from '../../services/trip.service';
import { UserService } from '../../services/user.service';

import { Trip } from '../../domain/prueba_db/trip';
import { User } from '../../domain/prueba_db/user';

// START - USED SERVICES
/**
* tripService.create
*	@description CRUD ACTION create
*
* tripService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* tripService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* tripService.list
*	@description CRUD ACTION list
*
* UserService.list
*	@description CRUD ACTION list
*
* tripService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Trip
 */
@Component({
    selector: 'app-trip-edit',
    templateUrl: 'trip-edit.component.html',
    styleUrls: ['trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Trip>;
    isNew: Boolean = true;
    formValid: Boolean;

    listName: User[];


    constructor(
        private tripService: TripService,
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.tripService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.userService.list().subscribe(list => this.listName = list);
        });
    }



    /**
     * Save Trip
     *
     * @param {boolean} formValid Form validity check
     * @param Trip item Trip to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.tripService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.tripService.update(this.itemDoc, this.item);
            }
            this.goBack();
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }

}
