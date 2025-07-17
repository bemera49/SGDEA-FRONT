import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements AfterViewInit {
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  public signaturePad!: SignaturePad;
  isSignatureDrawn: boolean = false;

  private isDrawing = false;

  constructor(private sweetAlertService: SweetAlertService) { }

  ngAfterViewInit(): void {
    const canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(canvas);
    this.resizeCanvas();

    // Cargar firma si hay datos en localStorage
    const savedSignature = localStorage.getItem('signature');
    if (savedSignature) {
      this.signaturePad.fromDataURL(savedSignature);
      this.isSignatureDrawn = true;
    }

    // Configurar eventos de dibujo en el canvas
    this.setupCanvasEvents();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resizeCanvas();
  }

  resizeCanvas(): void {
    const canvas = this.signatureCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(ratio, ratio);
      // Redibujar la firma existente si hay alguna
      const dataURL = this.signaturePad.toDataURL();
      this.signaturePad.clear();
      this.signaturePad.fromDataURL(dataURL);
    }
  }

  private setupCanvasEvents(): void {
    const canvas = this.signatureCanvas.nativeElement;

    // Configurar eventos para manejar el inicio y el fin del trazo
    canvas.addEventListener('mousedown', () => {
      this.isDrawing = true;
      this.isSignatureDrawn = true;
    });

    canvas.addEventListener('mousemove', (event) => {
      if (this.isDrawing && !this.signaturePad.isEmpty()) {
        this.isSignatureDrawn = true;
      }
    });

    canvas.addEventListener('mouseup', () => {
      this.isDrawing = false;
      this.isSignatureDrawn = true;
    });

    canvas.addEventListener('mouseleave', () => {
      this.isDrawing = false;
      this.isSignatureDrawn = true;
    });
  }

  clearSignature(): void {
    this.signaturePad.clear();
    localStorage.removeItem('signature');
    this.isSignatureDrawn = false;
  }

  saveSignature(): void {
    if (this.signaturePad.isEmpty()) {
      console.log('Please provide a signature first.');
    } else {
      this.sweetAlertService.sweetLoading();

      const dataURL = this.signaturePad.toDataURL();
      localStorage.setItem('signature', dataURL);
      this.sweetAlertService.showNotification("info", "Firma guardada");
      this.sweetAlertService.sweetClose();
    }
  }
}
