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

// export const getDocumentsFromFirebase = async (appState : any, data: any) => {
// console.log(data)
// let results : any = [];
//        const collectionRef = collection(db, appState.selectedCounty.value + ", " + appState.selectedState.value);
//         const documentQuery = query(collectionRef)
//         const querySnapshot = await getDocs(documentQuery)
//         if (!querySnapshot.empty) {
//
//             querySnapshot.docs.map(doc => {
//                     results.push({...doc.data(), id: doc.id})
//                 return null
//             })
//         }
//         console.log(results)
//       appState.tableData.value =  [...new Set(results)]
//     };
//
// export const getDocumentsFromFirebase = async (appState: any, data: any) => {
//     const collectionRef = collection(
//         db,
//         `${appState.selectedCounty.value}, ${appState.selectedState.value}`
//     );
//
//     if (data.data.query !== undefined) {
//         // Initialize results with all documents
//         let results: any[] = [];
//         const fieldsToQuery = ["instrument", "grantor", "grantee", "recordBook", "comments"];
//
//         for (const [field, value] of Object.entries(data.data.query)) {
//             if (typeof value === "string" && value.length > 0) {
//                 if (fieldsToQuery.includes(field)) {
//                     const valueArr = value.toString().toLowerCase().split(' ');
//                     for (const keyword of valueArr) {
//                         const keyWordField = `${field}KeyWords`;
//
//                         // Do a separate query for each keyword
//                         const documentQuery = query(collectionRef, where(keyWordField, "array-contains", keyword));
//                         const querySnapshot = await getDocs(documentQuery);
//
//                         // If results array is empty just populate it
//                         if (results.length === 0) {
//                             querySnapshot.docs.forEach((doc: any) => {
//                                 results.push({ ...doc.data(), id: doc.id });
//                             });
//                         } else {
//                             // else find the intersection
//                             const newResults: any[] = [];
//                             querySnapshot.docs.forEach((doc: any) => {
//                                 const result = results.find((result: any) => result.id === doc.id);
//                                 if (result) {
//                                     newResults.push(result);
//                                 }
//                             });
//                             // Assign the new smaller result set (intersection)
//                             results = newResults;
//                         }
//                     }
//                 } else {
//                     const documentQuery = query(collectionRef, where(field, "==", value));
//                     const querySnapshot = await getDocs(documentQuery);
//                     if (!querySnapshot.empty) {
//                         querySnapshot.docs.forEach(doc => {
//                             if (!results.find((result: any) => result.id === doc.id)) {
//                                 results.push({...doc.data(), id: doc.id});
//                             }
//                         });
//                     }
//                 }
//             }
//         }
//         appState.tableData.value = [...new Set(results)];
//     }
// };