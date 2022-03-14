/* eslint-disable func-names */
import client from './index'

class UserRepository {
    static create(fullName, email, password, id) {
        return client('users').insert({ fullName, email, password, id })
    }

    static findById(id) {
        return client('users').where('id', id)
    }

    static findByEmail(email) {
        return client('users').where('email', email)
    }

    static getUserAccount(id) {
        return client('wallets')
            .join('users', 'users.id', '=', 'wallets.owner')
            .select(
                'users.id',
                'users.fullName',
                'users.email',
                'wallets.id AS walletId',
                'wallets.balance'
            )
            .where({ owner: id })
    }
}

export default UserRepository
