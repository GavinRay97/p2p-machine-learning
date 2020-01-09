import createRoom from './ipfsConfig'
import m from 'mithril'

async function main() {
  const { room } = await createRoom()

  let state = {
    messages: [],
    currentText: ''
  }

  room.on('message', (msg) => {
    const formattedMessage = {
      topicIds: msg.topicIDs,
      content: msg.data.toString(),
      from: msg.from
    }

    console.log('Got message from IPFS room:', formattedMessage)
    state.messages.push(formattedMessage)
    m.redraw()
  })

  function MyComponent(vnode) {
    const addMessage = () => room.broadcast(state.currentText)

    return {
      // prettier-ignore
      view: () =>
        m("div.container",
          m("div#main-row.row",
            m("div.column",
              m("fieldset",
                m("label", "Function"),
                m("input[type='text'][placeholder='train()']"),
                m("label", "Options"),
                m("textarea[placeholder='{ key: val }']", {
                  oninput: (e) => state.currentText = e.target.value
                }),
                m("input.button-primary[type='submit'][value='Send']", {
                  onclick: addMessage
                })
              ),
            ),
            m("div.column",
              m("table",
                m("thead",
                  m("tr",
                    m("th","Content"),
                    m("th","Topic IDs"),
                    m("th","From"),
                  )
                ),
                m("tbody", state.messages.map(msg =>
                  m("tr",
                    m("td", msg.content),
                    m("td", msg.topicIds),
                    m("td", msg.from),
                  ))
                )
              ),
            )
          )
        )
    }
  }

  m.mount(document.body, MyComponent)
}

main()
