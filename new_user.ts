// Copied from article at https://medium.com/firebase-developers/patterns-for-security-with-firebase-offload-client-work-to-cloud-functions-7c420710f07
// gist from https://gist.github.com/CodingDoug/c0f782ad2e7e91933f8b5ffc53af55ad
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const firestore = admin.firestore()

export const authOnCreate =
functions.auth.user().onCreate(async user => {
    console.log(`Creating document for user ${user.uid}`)
    await firestore.collection('users').doc(user.uid).set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        credits: 5
    })
})

export const authOnDelete =
functions.auth.user().onDelete(async user => {
    console.log(`Deleting document for user ${user.uid}`)
    await firestore.collection('users').doc(user.uid).delete()
})