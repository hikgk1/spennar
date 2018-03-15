const queryGet = `query GetSpennir($id: String!) {
    getSpennir(id: $id) {
        _id
        serialNumer
        framleidandi
        framleidsluAr
        eigandi
        kVa
        voltHV
        voltLV
        ampHV
        ampLV
        vectorGroup
        impedance
        oliuThingd
        thingd
        threpaskiptir {
            serialNumer
            framleidandi
            fjoldiThrepa
            grunnThrep
            onOffLoad
        }
        bushings {
            serialNumer
            framleidandi
            framleidsluAr
            typa
            uu
            vv
            ww
            nn
            u
            v
            w
            n
        }
    }
}`;

const querySearch = `query SearchSpennir($search: String) {
    searchSpennir(search: $search) {
        _id
        serialNumer
        framleidandi
        eigandi
    }
}`;

const mutationCreate = `mutation CreateSpennir($spennir: SpennirInput) {
    createSpennir(spennir: $spennir) {
        _id
        serialNumer
        framleidandi
        framleidsluAr
        eigandi
        kVa
        voltHV
        voltLV
        ampHV
        ampLV
        vectorGroup
        impedance
        oliuThingd
        thingd
        threpaskiptir {
            serialNumer
            framleidandi
            fjoldiThrepa
            grunnThrep
            onOffLoad
        }
        bushings {
            serialNumer
            framleidandi
            framleidsluAr
            typa
            uu
            vv
            ww
            nn
            u
            v
            w
            n
        }
    }
}`;

const mutationModify = `mutation ModifySpennir($spennir: SpennirInput!) {
    modifySpennir(spennir: $spennir) {
        _id
        serialNumer
        framleidandi
        framleidsluAr
        eigandi
        kVa
        voltHV
        voltLV
        ampHV
        ampLV
        vectorGroup
        impedance
        oliuThingd
        thingd
        threpaskiptir {
            serialNumer
            framleidandi
            fjoldiThrepa
            grunnThrep
            onOffLoad
        }
        bushings {
            serialNumer
            framleidandi
            framleidsluAr
            typa
            uu
            vv
            ww
            nn
            u
            v
            w
            n
        }
    }
}`;

module.exports = {
    queryGet,
    querySearch,
    mutationCreate,
    mutationModify,
}