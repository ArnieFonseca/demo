
/**
 * Extendes the String class to include the empty property
 */
declare global {
    interface StringConstructor {
      empty: string;
    }
  }

  /**
   * Implements the new emprt property in the Sting interface
   */
  String.empty = ''

  export {}