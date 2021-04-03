import { Plugin } from "@vizality/entities";
import { getModule } from "@vizality/webpack";
import { patch, unpatch } from "@vizality/patcher"

const MessageEvents = getModule("sendMessage")

module.exports = class freenitrolegitnovirus extends Plugin {
    async start() {
		patch("emojisend", MessageEvents, "sendMessage", (args) => {
            let i = 0;
            args[1].content.split(" ").forEach(element => {
                if (/\<(a|)\:[a-z]*\:[0-9]*\>/gi.test(element)) {
                    console.log(element)
                    args[1].content = args[1].content.replace(element, args[1].invalidEmojis[i].url + "&size=64")
                    i += 1;
                }
            })
        })

        const emojipickerrow = getModule(m => m.default?.displayName === "EmojiPickerListRow")
        patch("test", emojipickerrow, "default", (args, res) => {
            res.props.children.forEach(element => {
                let cachedFunction = element.props.onClick
                // console.log(element.props.children.props.columnIndex)
                
                element.props.onClick = function(r) {
                    if (args[0].emojiDescriptors[element.props.children.props.columnIndex].isDisabled == true) {

                    } else {
                        cachedFunction(r)
                    }
                }
            })
        })

    }

    stop() {
        unpatch("emojisend")
        unpatch("test")
    }
};