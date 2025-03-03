import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";


@Component({
  selector: 'app-main-side',
  imports: [RouterLink, FooterComponent],
  templateUrl: './main-side.component.html',
  styleUrl: './main-side.component.scss'
})
export class MainSideComponent {

}
