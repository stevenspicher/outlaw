import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {db} from "./firebase";


export const addTicketGroup = async ( ticketObject: any)  => {
    try {
        const collectionRef = collection(db, "cafeNoir");
        addDoc(collectionRef, ticketObject).then((doc) => {
            return doc.id
        });

    } catch {
        //Todo: fix error message
        // appState.alertMessage.value = "Problem adding Document";
        // appState.alertSeverity.value = "error";
    }
}

// export const postDocumentsToFirebase = async (appState: any, data: any) => {
//     data.data.documents.forEach((document : any) => {
//         //Todo: add duplicate check
//         addDocument(appState, document).then(() => {} )
//
//     })
// }

export const getDocumentsFromFirebase = async () => {
let results : any = [];
       const collectionRef = collection(db, "cafeNoir");
        const documentQuery = query(collectionRef)
        const querySnapshot = await getDocs(documentQuery)
        if (!querySnapshot.empty) {

            querySnapshot.docs.map(doc => {
                    results.push({...doc.data(), id: doc.id})
                return null
            })
        }
        return results
    };
