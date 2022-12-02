import { createApp } from 'vue'
import WikiMentioner from '../../components/common/message/WikiMentioner.vue'
import { TipType } from '~/plugins/addon/Tipper'

export class MentionTip {

    public content: String
    public type?: TipType
    public time: Number
    public emphasis?: Boolean

    constructor(content: String, options = {
        emphasis: false
    } as {
        time?: number,
        type?: TipType,
        emphasis?: boolean
    }) {

        this.content = content
        this.time = options.time || 2600
        this.type = options.type || TipType.DEFAULT
        this.emphasis = options.emphasis

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
