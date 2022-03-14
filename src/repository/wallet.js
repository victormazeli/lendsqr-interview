/* eslint-disable func-names */
import client from './index'

class WalletRepository {
    static create(id, userId) {
        return client('wallets').insert({ id, owner: userId })
    }

    static findById(id) {
        return client('wallets').where('id', id)
    }

    static findByUserId(id) {
        return client('wallets').where('owner', id)
    }

    static update(id, balance) {
        return client('wallets').where('id', id).update({ balance })
    }
}

export default WalletRepository
