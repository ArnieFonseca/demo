 
/**
 * Private Helper Class
 */
class GlobalHelper  {
  static PROTOCOL:string = 'http://'
  static PORT_NUMBER:string = '8000'
  static BASE_URL:string = `127.0.0.1:${this.PORT_NUMBER}/`
}

/**
 * Constants used Globally thru the application
 */
export class GobalValue {

  static SERVICE_URL:string = `${GlobalHelper.PROTOCOL}${GlobalHelper.BASE_URL}`
}

