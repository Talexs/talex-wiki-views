import {createApp} from 'vue'
import WikiMentioner from '../../components/common/message/WikiMentioner.vue'
import {TipType} from '../Common'

export class MentionTip {

    public content: String
    public type?: TipType
    public time: Number
    public emphasis?: Boolean

    constructor(content: String, time: Number = 2600, type?: TipType, emphase: Boolean = false) {

        this.content = content
        this.time = time
        this.type = type
        this.emphasis = emphase

    }

}

class MentionManager {

    private queue: Array<MentionTip>
    private processing: boolean

    constructor() {

        this.queue = []
        this.processing = false

    }

    public async applyFor(tip: MentionTip) {

        this.queue.push(tip)

        await this._process();

    }

    private async _process() {

        if( this.processing ) {

            return

        }

        this.processing = true

        const root: HTMLDivElement = document.createElement('div');

        const app = createApp(WikiMentioner, {
            list: this.queue,
            close: async () => {

                app.unmount();

                document.body.removeChild(root);

                this.processing = false

            }
        })

        this.queue = []

        document.body.appendChild(root);

        app.mount(root);

    }

}

export const mentionManager = new MentionManager()
