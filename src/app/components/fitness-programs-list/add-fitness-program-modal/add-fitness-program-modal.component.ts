import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FileService } from "../../../services/file.service";

@Component({
  selector: 'app-add-fitness-program-modal',
  templateUrl: './add-fitness-program-modal.component.html',
  styleUrls: ['./add-fitness-program-modal.component.scss']
})
export class AddFitnessProgramModalComponent implements OnInit {
  fitnessProgramForm: FormGroup;
  instructorForm: FormGroup;
  userId: number;
  selectedFile: File | null = null;
  selectedFileName = '';
  fileUrl: string | ArrayBuffer | null = null;

  constructor(private _fileService: FileService) {
  }

  ngOnInit() {
    this.buildEmptyFitnessForm();
    this.buildEmptyInstructorForm();
  }

  buildEmptyFitnessForm() {
    this.fitnessProgramForm = new FormGroup({
      price: new FormControl(null, Validators.required),
      difficultyLevel: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
    });
  }

  buildEmptyInstructorForm() {
    this.instructorForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      sex: new FormControl(null, Validators.required),
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.displaySelectedFile(file);
    }
    this.selectedFile = event.target.files[0];
  }

  displaySelectedFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.fileUrl = event.target.result.toString();
      this.selectedFileName = file.name;
      // this.fitnessProgramForm.get('image').setValue(file.name); //add form for edit mode
    };
    reader.readAsDataURL(file);
  }
}
