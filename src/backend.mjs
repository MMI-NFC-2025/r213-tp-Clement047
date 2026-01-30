import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090"); // adapte si besoin

export async function getOffres() {
    try {
        const data = await pb.collection("Maison").getFullList({
            sort: "-created",
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en lisant la liste des maisons", error);
        return [];
    }
}

export function getImageUrl(record, fileName) {
    return pb.files.getURL(record, fileName);
}


