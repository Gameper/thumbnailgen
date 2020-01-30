/**
 * The GlobalDataSingleton class defines the `getInstance` method that lets clients access
 * the unique data singleton instance.
 */
class GlobalDataSingleton {
    private static instance: GlobalDataSingleton;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): GlobalDataSingleton {
        if (!GlobalDataSingleton.instance) {
            GlobalDataSingleton.instance = new GlobalDataSingleton();
        }

        return GlobalDataSingleton.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public someBusinessLogic() {
        // ...
    }
}
export default GlobalDataSingleton;
