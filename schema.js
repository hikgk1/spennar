const { buildSchema } = require('graphql');
const { ObjectId } = require('mongodb');

const schema = buildSchema(`
type Skiptir {
    serialNumer: String!
    framleidandi: String
    fjoldiThrepa: String
    grunnThrep: String
    onOffLoad: String
}

input SkiptirInput {
    serialNumer: String!
    framleidandi: String
    fjoldiThrepa: String
    grunnThrep: String
    onOffLoad: String
}

type Bushing {
    serialNumer: String!
    framleidandi: String
    framleidsluAr: String
    typa: String
    uu: String
    vv: String
    ww: String
    nn: String
    u: String
    v: String
    w: String
    n: String
}

input BushingInput {
    serialNumer: String!
    framleidandi: String
    framleidsluAr: String
    typa: String
    uu: String
    vv: String
    ww: String
    nn: String
    u: String
    v: String
    w: String
    n: String
}

type Spennir {
    _id: String
    serialNumer: String!
    framleidandi: String!
    framleidsluAr: String
    eigandi: String!
    kVa: String
    voltHV: String
    voltLV: String
    ampHV: String
    ampLV: String
    vectorGroup: String
    impedance: String
    oliuThingd: String
    thingd: String
    threpaskiptir: Skiptir
    bushings: Bushing
}

input SpennirInput {
    _id: String
    serialNumer: String!
    framleidandi: String!
    framleidsluAr: String
    eigandi: String!
    kVa: String
    voltHV: String
    voltLV: String
    ampHV: String
    ampLV: String
    vectorGroup: String
    impedance: String
    oliuThingd: String
    thingd: String
    threpaskiptir: SkiptirInput
    bushings: BushingInput
}

type Query {
    getSpennir(id: String!): Spennir
    searchSpennir(search: String): [Spennir]
}

type Mutation {
    createSpennir(spennir: SpennirInput): Spennir
    modifySpennir(spennir: SpennirInput!): Spennir
}
`);

function makeRoot(collection) {
    return {
        getSpennir: async ({id}) => {
            console.log(`${new Date().toISOString()} - Sæki spenni ${id}`);
            return await collection.findOne(ObjectId(id));
        },
        
        searchSpennir: async ({search}) => {
            console.log(`${new Date().toISOString()} - Leita að ${search}`);
            if(!search) return await collection.find({}).toArray();
            /*return await collection.find({ 
                $text: { 
                    $search: search
                } 
            }).toArray();*/
            return await collection.find({ 
                $or: [
                    { "serialNumer": { $regex: search, $options:"i" } },
                    { "framleidandi": { $regex: search, $options:"i" } },
                    { "eigandi": { $regex: search, $options:"i" } }
                ]
            }).toArray();
        },
        
        createSpennir: async ({spennir}) => {
            console.log(`${new Date().toISOString()} - Bý til spenni ${spennir.serialNumer}`);
            const res = await collection.insert(spennir);
            return await collection.findOne(res.insertedIds[0]);
        },
        
        modifySpennir: async ({spennir}) => {
            console.log(`${new Date().toISOString()} - Breyti spenni ${spennir._id}`);
            spennir._id = ObjectId(spennir._id);
            const res = await collection.update(
                { _id: spennir._id },
                spennir
            );
            return await collection.findOne(ObjectId(spennir._id));
        },
    };
}

module.exports = {
    schema,
    makeRoot,
}