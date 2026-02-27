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


export async function getOffre(id) {
    try {
        const data = await pb.collection("Maison").getOne(id);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en lisant la maison", error);
        return null;
    }
}

export async function addOffre(formData) {
    try {
        const record = await pb.collection("Maison").create(formData);
        return {
            success: true,
            message: "Offre ajoutée avec succès"
        };
    } catch (error) {
        console.log("Erreur ajout maison", error);
        return {
            success: false,
            message: "Erreur lors de l'ajout"
        };
    }
}

export async function filterByPrix(minPrix, maxPrix) {
    try {
        // PocketBase filter (attention: champs = tes noms PB)
        // Ici on suppose que ton champ s'appelle "prix"
        const data = await pb.collection("Maison").getFullList({
            sort: "-created",
            filter: `prix >= ${minPrix} && prix <= ${maxPrix}`,
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en filtrant par prix", error);
        return [];
    }
}