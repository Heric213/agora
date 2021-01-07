/*
* JANGAN UBAH-UBAH INFO!!!
* "JANGAN MODAL NAMA DOANG BRO!!!"
* SCRIPT BY ARIS187 ID
* JANGAN MODAL NAMA DOANG BOSQ
* HARGAILAH YG MEMBUAT SCRIPT INI BOSQ
* JANGAN UBAH-UBAH INFO!!!
* ARIS187 ID
* BOLEH UBAH TAPI KECUALI INFO!!!
*/
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const fs = require("fs")

const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const bulan = arrayBulan[moment().format('MM') - 1]

const config = {
    A187: '📍N҉ᎩᎷ 𝔹𝕆𝕋  ✘📍',
    instagram: 'OFF',
    nomer: 'wa.me/6481234365',
    aktif: '24 JAM',
    youtube: 'OFF',
    whatsapp: 'OFF',
    tanggal: `TANGGAL: ${moment().format('DD')} ${bulan} ${moment().format('YYYY')}`,
    waktu: time
}

const { A187, tanggal, waktu, instagram, whatsapp, youtube, nomer, aktif, ontime } = config

const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys")

const {
    help,
    menu1,
    menu2,
    downloadImage,
    readTextInImage,
    searchYoutube,
    ytdl,
    fb,
    ytmp3,
    loli,
} = require('./lib')

const { animPict, cewePict, cowoPict } = require('./lib/pict')

const { exec } = require("child_process")

const client = new WAConnection()

client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready, subscribe Aris187 ID`)
})

client.on('credentials-updated', () => {
   const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')

client.connect();

// client.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@aditiaalfians`)

client.on('message-status-update', json => {
   const participant = json.participant ? ' (' + json.participant + ')' : ''
   console.log(`[ ${time} ] => bot by ig:@_sadboy.ig`)
})

client.on('message-new', async (m) => {
   const messageContent = m.message
   const text = m.message.conversation
   const messageType = Object.keys(messageContent)[0]

   const re = /[\#\!\@\/\?\%\$\.]/

   const value = text.split(' ').splice(1).join(' ')

   let id = m.key.remoteJid
   let imageMessage = m.message.imageMessage

   const prefix = messageType === 'imageMessage' ? imageMessage.caption.split(' ')[0].split(re)[1] : text.split(' ')[0].split(re)[1] // multiple prefix

   console.log(`[ ${time} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);

   switch (prefix) {
       case 'help':
           client.sendMessage(id, help.help(id, A187, tanggal, waktu, whatsapp, youtube, instagram, aktif, nomer, ontime), MessageType.text)
           break
       case 'menu1':
           client.sendMessage(id, menu1.menu1(id, A187, tanggal, waktu, whatsapp, youtube, instagram, aktif, nomer, ontime), MessageType.text)
           break
       case 'menu2':
           client.sendMessage(id, menu2.menu2(id, A187, tanggal, waktu, whatsapp, youtube, instagram, aktif, nomer, ontime), MessageType.text)
           break
       case 'menu3':
           client.sendMessage(id, menu3.menu3(id, A187, tanggal, waktu, whatsapp, youtube, instagram, aktif, nomer, ontime), MessageType.text)
           break
      case 'donate':
           client.sendMessage(id, donate.donate(id, A187, tanggal, waktu, whatsapp, youtube, instagram, aktif, nomer, ontime), MessageType.text)
           break          
      case 'info':
           client.sendMessage(id, info.info(id, A187, tanggal, waktu, whatsapp, youtube, instagram,aktif, nomer, ontime), MessageType.text)
           break             
       case 'nulis':
           nulis(value)
               .then(data => {
                   client.sendMessage(id, '[ESPERE UM POUCO...', MessageType.text)
                   client.sendMessage(id, data, MessageType.image)
               })
               .catch(err => {
                   console.log(err)
               })
           break
       case 'say':
           await client.sendMessage(id, value, MessageType.text)
           break
       case 'ytmp3':
           ytdl('mp3', value)
               .then(data => {
                   const { judul, size, hasil: link } = data
                   let hasil = `OLA AQUI ESTA O LINK DE DOWNLOAD DA MSC\nCLIQUE NO LINK ABAIXO:\nMUSICA: ${judul}\n\nTamanho Do audio: ${size}\n\nLink: ${link}`
                   client.sendMessage(id, '[ESPERE UM POUCO...', MessageType.text)
                   client.sendMessage(id, hasil, MessageType.text)
               })
               .catch(err => {
                   console.log(err)
               })
           break
       case 'ytmp4':
           ytdl('mp4', value)
               .then(data => {
                   const { judul, size, hasil: link } = data
                   let hasil = `OLA AQUI ESTA O LINK DE DOWNLOAD DA MSC\nCLIQUE NO LINK ABAIXO:\nMUSICA: ${judul}\n\nTamanho Do audio: ${size}\n\nLink: ${link}`
                   client.sendMessage(id, '[ESPERE UM POUCO...', MessageType.text)
                   client.sendMessage(id, hasil, MessageType.text)
               })
               .catch(err => {
                   console.log(err)
               })
           break
   case 'fb':
           fb(value)
               .then(data => {
                   const { resultHD, resultSD } = data
                   let hasil = `Escolha a resolução querida😙 \n\n\n HD ${resultHD} \n\n\n SD ${resultSD}`
                   client.sendMessage(id, hasil, MessageType.text)
               })
               .catch(err => {
                   console.log(err)
           }
           break
       case 'sticker':
           const image = await client.downloadAndSaveMediaMessage(m)
           exec('cwebp -q 50 ' + image + ' -o temp/' + time + '.webp', (error, stdout, stderr) => {
               let result = fs.readFileSync('temp/' + time + '.webp')
               client.sendMessage(id, result, MessageType.sticker)
           })
           break
      case 'loli':
           loli()
               .then(buffer => {
                   client.sendMessage(id, '[ESPERE UM POUCO...', MessageType.text)
                   client.sendMessage(id, buffer, MessageType.image)
               })
               .catch(err => {
                   console.log(err)
               })
           break
           case 'ytmp3':
           mp3()
               .then(buffer => {
                   client.sendMessage(id, '[ESPERE UM POUCO...', MessageType.text)
                   client.sendMessage(id, buffer, MessageType.image)
               })
               .catch(err => {
                   console.log(err)
               })
            } else {
                client.reply(from, 'Masukkan data bahasa : [id] untuk indonesia, [en] untuk inggris, [jp] untuk jepang, dan [ar] untuk arab', id)
            }
            break     
      case 'stickergif':
            if (isMedia) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    const mediaData = await decryptMedia(message, uaOverride)
                    client.reply(from, '[WAIT] Sedang di proses⏄1�71ￄ1�77 silahkan tunggu ± 1 min!', id)
                    const filename = `./media/aswu.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/output.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        const gif = await fs.readFileSync('./media/output.gif', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                    })
                } else (
                    client.reply(from, '[❗] Kirim video dengan caption *!stickerGif* max 10 sec!', id)
                )
            }
            break     
     case 'sticker':
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await client.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    client.reply(from, mess.error.Iv, id)
                }
            } else {
                    client.reply(from, mess.error.St, id)
            }
            break       
       default:
           break
   }
})
