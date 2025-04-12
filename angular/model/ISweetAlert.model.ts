type IconType = 'success' | 'error' | 'warning' | 'info' | 'question';
interface ConfirmationAttributes {
  title?: string;
  text?: string;
  icon?: IconType;
}

export interface ISweetAlertConfirmModel {
  title?: string;
  text?: string;
  icon?: IconType;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  confirm?: ConfirmationAttributes;
}



export interface ISweetAlertConfirmModel2 {
  title?: string;
  text?: string;
  icon?: IconType;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  reverseButtons?: boolean;
  confirm?: ConfirmationAttributes;
  cancel?: ConfirmationAttributes;
}


export interface AlertResponse {
  confirmed: boolean;
  message?: string;
  data?: any;
}

export interface IToast {
  toast?: boolean,
  position?: string | any,
  showConfirmButton?: boolean,
  timer?: number,
  timerProgressBar?: boolean,
    icon?: IconType,
    title?: string,
}