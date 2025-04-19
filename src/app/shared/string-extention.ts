
/**
 * Extendes the String class to include the empty property
 */
declare global {
    interface StringConstructor {
      empty: string;
    }
  }

  /**
   * Implements the new empty property in the String interface
   */
  String.empty = ''

  export {}