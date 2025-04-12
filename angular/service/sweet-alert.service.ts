//@ts-ignore
import { Injectable } from '@angular/core';
//@ts-ignore
import Swal from 'sweetalert2';
//@ts-ignore
import { ISweetAlertConfirmModel, ISweetAlertConfirmModel2, AlertResponse, IToast } from '../../model';
//@ts-ignore
import { pick } from '../../util/pick';
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  private extractAttributes(dataObject: any, keys: string[]) {
    return pick(dataObject, keys);
  }

  private confirm(config: ISweetAlertConfirmModel): Promise<AlertResponse> {
    return Swal.fire(
      this.extractAttributes(config, ["title", "text", "icon", "showCancelButton", "confirmButtonColor", "cancelButtonColor", "confirmButtonText"])).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(this.extractAttributes(config.confirm, ["title", "text", "icon"]));
          return { confirmed: true, message: config.confirm?.text };
        }
        return { confirmed: false, message: "Cancelled" };
      });
  }

  private confirm2(config: ISweetAlertConfirmModel2): Promise<AlertResponse> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });

    return swalWithBootstrapButtons.fire(this.extractAttributes(config, ["title", "text", "icon", "showCancelButton", "confirmButtonText", "cancelButtonText", "reverseButtons"])).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(this.extractAttributes(config.confirm, ["title", "text", "icon"]));
        return { confirmed: true, message: config.confirm?.text };
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(this.extractAttributes(config.cancel, ["title", "text", "icon"]));
        return { confirmed: false, message: config.cancel?.text };
      }
      return { confirmed: false, message: "Dismissed" };
    });
  }


  // ✅ Default basic confirm alert
  showConfirm(data: ISweetAlertConfirmModel): Promise<AlertResponse> {
    const config: ISweetAlertConfirmModel = {
      title: data.title || "Are you sure?",
      text: data.text || "You won't be able to revert this!",
      icon: data.icon || "warning",
      showCancelButton: data.showCancelButton || true,
      confirmButtonColor: data.confirmButtonColor || "#3085d6",
      cancelButtonColor: data.cancelButtonColor || "#d33",
      confirmButtonText: data.confirmButtonText || "Yes, delete it!",
      confirm: {
        title: data.confirm?.title || "Deleted!",
        text: data.confirm?.icon || "Your file has been deleted.",
        icon: data.confirm?.icon || "success"
      }
    };
    return this.confirm(config);
  }

  // ✅ Default styled confirm alert with cancel action
  showConfirm2(data: ISweetAlertConfirmModel2): Promise<AlertResponse> {
    const config: ISweetAlertConfirmModel2 = {
      title: data.title || "Are you sure?",
      text: data.text || "This action cannot be undone!",
      icon: data.icon || "warning",
      showCancelButton: data.showCancelButton || true,
      confirmButtonText: data.confirmButtonText || "Yes, delete it!",
      cancelButtonText: data.cancelButtonText || "No, cancel!",
      reverseButtons: data.reverseButtons || true,
      confirm: {
        title: data.confirm?.title || "Deleted!",
        text: data.confirm?.text || "Your file has been deleted.",
        icon: data.confirm?.icon || "success"
      },
      cancel: {
        title: data.confirm?.title || "Cancelled",
        text: data.confirm?.text || "Your imaginary file is safe :)",
        icon: data.confirm?.icon || "error"
      }
    };
    return this.confirm2(config);
  }

  showToast(config: IToast) {
    const Toast = Swal.mixin({
      toast: config.toast || true,
      position: config.position || "top-end",
      showConfirmButton: config.showConfirmButton || false,
      timer: config.timer || 3000,
      timerProgressBar: config.timerProgressBar || false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: config.icon || "success",
      title: config.title || "Signed in successfully"
    });
  }
}