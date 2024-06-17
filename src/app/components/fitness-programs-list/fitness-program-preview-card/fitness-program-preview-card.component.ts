import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FitnessProgramCard } from "../../../models/FitnessProgramCard";
import { FileService } from "../../../services/file.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-fitness-program-preview-card',
  templateUrl: './fitness-program-preview-card.component.html',
  styleUrls: ['./fitness-program-preview-card.component.scss']
})
export class FitnessProgramPreviewCardComponent implements OnInit, OnDestroy {

  @Input() fitnessProgramCard: FitnessProgramCard = {} as FitnessProgramCard;
  fileUrl: any;
  subscriptions = new Subscription();

  constructor(private _router: Router,
              private _fileService: FileService) {
  }

  ngOnInit() {
    this.getFile();
  }

  getFile(): void {
    this.subscriptions.add(
      this._fileService.getFileById(this.fitnessProgramCard.image.id).subscribe(
        (data: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            this.fileUrl = reader.result;
          };
        },
        error => {
          //TODO: Handle error
          console.error('Error retrieving file:', error);
        }
      ));
  }

  onFitnessProgramCardClick() {
    this._router.navigateByUrl(`fitness-program/${this.fitnessProgramCard.id}`);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
