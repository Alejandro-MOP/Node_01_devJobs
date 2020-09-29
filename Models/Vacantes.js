const mongoose = require('mongoose');
const slug = require('slug');
const shortid = require('shortid');

const vacantesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: 'El nombre de la vacante es obligatorio',
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true,
        required: 'La ubicación es obligatoria'
    },
    salario: {
        type: String,
        default: 0
    },
    contrato: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    url:{
        type: String,
        lowercase: true
    },
    skills: {
        type: [String],
        candidatos: [{
            nombre: String,
            email: String,
            cv: String
        }]
    }
});
vacantesSchema.pre('save', next => {
    const url = slug(this.titulo);
    this.url = `${url}-${shortid.generate()}`;
    next();
})
module.exports = mongoose.model('Vacante', vacantesSchema);