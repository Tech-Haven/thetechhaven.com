const { updateSSHKey } = require('../utils/utils')
const User = require('../models/User')

module.exports = {
  name: 'update-ssh',
  description: 'Update your ssh key on the lab (required to create VMs)',
  usage: `<ssh public key>`,
  async execute(message, args) {

    const key = `${args[0]} ${args[1]} ${args[2]}`

    if (!(key)) {
      return message.reply("Please enter your ssh public key!")
    }

    User.findOne({ _id: message.author.id }).populate('lab_user').exec(async (err, user) => {
      if (err) {
        console.error(err);
        return message.reply(`Error!: ${err}`)
      }

      const sshUpdated = await updateSSHKey(user.lab_user.username, user.lab_user.login_token, key)

      if (sshUpdated.error) {
        console.log(sshUpdated)
        return message.reply(`Error!: ${sshUpdated.error}`)
      }

      return message.reply(`SSH key updated!`)
    })
  }
}
