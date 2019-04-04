/**
 * This class contains the code necessary to generate log-entries.
 * It is used for logging draw-calls as well as responses from the survey.
 **/
export class Logger {
    messages:Message[]
    session:string
    user:string
    ua:string
    url:string
    screenWidth: number
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    pixelRatio: number

    waitingForActionSince:number

    constructor() {
        this.ua = window.navigator.userAgent
        this.screenWidth = window.screen.width
        this.screenHeight = window.screen.height
        this.url = window.location.href
        this.pixelRatio = window.devicePixelRatio
        this.user = this.getUser()
        this.session = this.uuid()
        this.messages = []

        this.waitingForActionSince = 0


        this.init()
        this.send()
    }

    /**
     * Returns a unique user ID in all cases. If the user already has an ID, the method reads it
     * from a cookie. Otherwise it returns a new ID and stores it in a cookie.
     **/
    getUser() {
        if(!this.getCookie('user')) {
            console.log("nope", this.getCookie('user'))
            this.setCookie('user', this.uuid())
        } 
        console.log("yep", this.getCookie('user'))
        return this.getCookie('user') 
    }

    /**
     * Generate a (hopefully) unique ID.
     **/
    private uuid() {
        return Date.now() + "-" + Math.random().toString(36).replace(";", "a").replace("=", "b") 
    }


    /**
     * Gets the value for a cooke. Returns `null` if the name
     * does not exist.
     **/
    private getCookie(name:string):(string | null) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    private setCookie(key:string, value:string) {
        document.cookie = `${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT"`; 
    }

    /**
     * Records a draw call, typically from a director.
     **/
    public animation(name:string, position:number) {
        this.waitIsOver()
        this.messages.push({
            timestamp: Date.now(),
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            name: name,
            position: position,
        }) 
    }

    /**
     * Records an "alive"-entry. These entries are generated periodically when the
     * reader does not scroll but still has the experiment open.
     **/
    public alive() {
        if(!this.waitMore()) {return}
        this.messages.push({
            timestamp: Date.now(),
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            name: '@alive',
            position: -1,
        }) 
    }


    // TODO: Implement
    public error() {}

    private waitMore() {
        this.waitingForActionSince = this.waitingForActionSince + 20
        return this.waitingForActionSince < 120 // don't wait more than 2 min
    }

    private waitIsOver() {
        this.waitingForActionSince = 0 
    }

    /**
     * Records that the experiment has been loaded.
     **/
    public init() {
        this.messages.push({
            timestamp: Date.now(),
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            name: '@init',
            position: -1,
        }) 
    }


    /**
     * Formats the log-entries for draw-calls properly:
     * * Timestamp
     * * URL
     * * User ID
     * * Session ID
     * * User Agent String
     * * Screen width
     * * Screen height
     * * window width
     * * Window height
     * * Pixel ratio (pixel density)
     * * Name of the Drawable that is being rendered
     * * Relative position that is being rendered
     **/
    public toString() {
        // timestamp, user, session, scroll 
        let out = ""
        this.messages.forEach( (m) => {
            out = out + this.wrap( m.timestamp.toString()       ) + ","
            out = out + this.wrap( this.url                     ) + ","
            out = out + this.wrap( this.user                    ) + ","
            out = out + this.wrap( this.session                 ) + ","
            out = out + this.wrap( this.ua                      ) + ","
            out = out + this.wrap( this.screenWidth.toString()  ) + ","
            out = out + this.wrap( this.screenHeight.toString() ) + ","
            out = out + this.wrap( m.windowWidth.toString()     ) + ","
            out = out + this.wrap( m.windowHeight.toString()    ) + ","
            out = out + this.wrap( this.pixelRatio.toString()   ) + ","
            out = out + this.wrap( m.name                       ) + ","
            out = out + this.wrap( m.position.toString()        ) + "\n"
        })
        return out
    }


    public wrap(str:string, into='"') {
        return  into+str+into
    }

    /**
     * Sends the latest records to the server removes them from the storage.
     **/
    public send() {
        if(this.messages.length === 0) {return}
        const body = this.toString()
        console.log(body)
        //fetch('https://www.jonasoesch.ch/mortality/', {
        fetch("__API_URL__", {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body,
        });
        this.messages = []
    }

}

/**
 * Structure of a record.
 **/
interface Message {
    timestamp: number
    windowWidth: number
    windowHeight: number
    name:string
    position:number
}

