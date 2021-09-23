import { Component } from "react";
var firebase = require('firebase');
var uuid = require('uuid');

const firebaseConfig = {
    apiKey: "AIzaSyAYvrf287HnlK2Tg_jDSA1EBoJ3A1rP1N4",
    authDomain: "sondagematu.firebaseapp.com",
    databaseURL: "https://sondagematu-default-rtdb.firebaseio.com",
    projectId: "sondagematu",
    storageBucket: "sondagematu.appspot.com",
    messagingSenderId: "662137220750",
    appId: "1:662137220750:web:45715388cad017944ae3df",
    measurementId: "G-N0C7ETWLPX"
};

// Initialize Firebase
// Initialize Firebase
//const app2 = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
// firebase.analytics();



class SondageMatu extends Component {

    utilisateursubmit(event) {
        var name = this.refs.name.value;
        this.setState({ utilisateur: name }, function () {
            console.log(this.state);
        })
    }


    surveysubmit(event) {
     firebase.database().ref('sondagematu/'+this.state.uid).set({
         utilisateur: this.state.utilisateur,
         reponses: this.state.reponses
     });
     this.setState({issubmitted:true})
    }

    reponseselected(event) {
        var reponses = this.state.reponses;
        if (event.target.name == 'ans1') {
            reponses.ans1 = event.target.value;
        }
        else if (event.target.name == 'ans2') {
            reponses.ans2 = event.target.value;
        }
        else if (event.target.name == 'ans3') {
            reponses.ans3 = event.target.value;
        }
        else if (event.target.name == 'ans4') {
            reponses.ans4 = event.target.value;
        }

        this.setState({ reponses:reponses}, function () {
            console.log(this.state);
        })

    };

    constructor(props) {
        super(props);
        this.state = {
            uid: uuid.v1(),
            utilisateur: '',
            reponses: {
                ans1: '',
                ans2: '',
                ans3: '',
                ans4: '',
            },
            issubmitted: false
        };
        this.utilisateursubmit = this.utilisateursubmit.bind(this);
        this.surveysubmit = this.surveysubmit.bind(this);
        this.reponseselected = this.reponseselected.bind(this);

    }

    render() {

        var name = '';
        var questions = '';

        if (this.state.utilisateur == '' && this.state.issubmitted == false) {
            name = <div>
                <h4>Bonjour, Merci de consacrer quelques minutes à remplir ce questionnaire. </h4>
                <form onSubmit={this.utilisateursubmit}>
                    <input className="sname" type="text" placeholder="Saisie votre nom ici" ref="name" />
                </form>
            </div>
        }
        else if (this.state.utilisateur !== '' && this.state.issubmitted == false) {
            name = <div>
                 <h4>Bonjour {this.state.utilisateur} , Merci de consacrer quelques minutes à remplir ce questionnaire. </h4>
            </div>;
            questions = <div>
               

                <form onSubmit={this.surveysubmit}>
                    <div className="card">
                        <label> 1)  L'agent était réactif et professionnel ?</label><br />
                        <input type="radio" name="ans1" value="bien" onChange={this.reponseselected} /> Tout à fait d'accord
                        <input type="radio" name="ans1" value="mauvaise" onChange={this.reponseselected} /> Pas du tout d'accord
                    </div>
                    <div className="card">
                        <label> 2)  Que pensez-vous  de notre  points de vente ?</label><br />
                        <input type="radio" name="ans2" value="tres_attrayant" onChange={this.reponseselected} /> Très attrayant
                        <input type="radio" name="ans2" value="Peu_attrayant" onChange={this.reponseselected} /> Peu attrayant
                        <input type="radio" name="ans2" value="non_attrayant" onChange={this.reponseselected} /> Pas du tout attrayant
                    </div>
                    <div className="card">
                        <label> 3)  Quel est votre niveau de satisfaction concernant notre service ?</label><br />
                        <input type="radio" name="ans3" value="tres_satisfait" onChange={this.reponseselected} /> Très satisfait(e)
                        <input type="radio" name="ans3" value="peu_satisfait" onChange={this.reponseselected} /> Un peu satisfait(e)
                        <input type="radio" name="ans3" value="non_satisfait" onChange={this.reponseselected} /> Très insatisfait(e)
                    </div>
                    <div className="card">
                        <label> 4)  Où avez-vous trouvé votre agent d'assurance ?</label><br />
                        <input type="radio" name="ans4" value="internete" onChange={this.reponseselected} /> L'Internet
                        <input type="radio" name="ans4" value="reseau_sociaux" onChange={this.reponseselected} /> Des médias sociaux
                        <input type="radio" name="ans4" value="recommandation" onChange={this.reponseselected} /> Recommandation
                    </div>
                    
                    <input className="feedback-button" type="submit" value="envoyer" />
                </form>


            </div>
        }
        else if (this.state.utilisateur !== '' && this.state.issubmitted == true) {
            name = <div>
            <h4>Merci :  {this.state.utilisateur}  d'avoir soumis le sondage. </h4>
       </div>;
        }

        return (
            <div>
                {name}
                =================================
                {questions}
            </div>
        )
    }
}
export default SondageMatu