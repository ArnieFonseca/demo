import { environment } from '../../environments/environment'; 
/**
 * Private Helper Class
 */
class GlobalHelper  {
  static PROTOCOL:string = environment.PROTOCOL   
  static PORT_NUMBER:string = environment.PORT_NUMBER
  static BASE_URL:string = `${environment.SERVER_NAME}:${this.PORT_NUMBER}/`
}

/**
 * Constants used Globally thru the application
 */
export class GobalValue {

  static SERVICE_URL:string = `${GlobalHelper.PROTOCOL}${GlobalHelper.BASE_URL}`
}

