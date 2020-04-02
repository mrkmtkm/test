
import * as request from "request"

router.post("api/chatwork", (req, res, { }) => {
  if (req.body.webhook_event.body.indexOf("<bot call>") !== -1) {
    let msg: string = req.body.webhook_event.body
    msg = msg.replace(/<bot call>/g, "")
    // msg = msg.replace(/\n/g, " ")

    // 以下はチャットワークへの投稿処理
    // チャットワークのトークン
    const TOKEN = "d4b48dd1dbd83dcdae4c86fedeb6086f"
    // ルームID
    const roomId = "142556979"
    const options = {
      url: `https://api.chatwork.com/v2/rooms/${roomId}/messages`,
      headers: {
        "X-ChatWorkToken": TOKEN,
      },
      form: { body: msg },
      json: true,
    }
    // setTimeoutがないとうまく動作しなかった気がする
    setTimeout(() => {
      request.post(options, (error: string, response, body: string) => {
        if (!error && response.statusCode === 200) {
          console.log(body)
        } else {
          console.log("error: " + response.statusCode)
        }
      })
    }, 10)

  }
  res.sendStatus(200)
})
