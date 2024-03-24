import { Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('slideAnimation', [
            transition('void => *', [
                style({transform: 'translateX(100%)'}),
                animate('300ms ease-in-out')
            ]),
            transition('* => void', [
                animate('300ms ease-in-out', style({transform: 'translateX(-100%)'}))
            ])
        ])
    ]
})
export class CarouselComponent {

    @Input() images: string[] = [];
    activeIndex = 0;

    nextSlide() {
        if (this.images.length <= 1) {
            return; // Don't proceed if there's only one image
        }

        if (this.activeIndex < this.images.length - 1) {
            this.activeIndex++;
        } else {
            this.activeIndex = 0; // Go to the first image if it's the last one
        }
    }

    prevSlide() {
        if (this.images.length <= 1) {
            return; // Don't proceed if there's only one image
        }

        if (this.activeIndex > 0) {
            this.activeIndex--;
        } else {
            this.activeIndex = this.images.length - 1; // Go to the last image if it's the first one
        }
    }
}
