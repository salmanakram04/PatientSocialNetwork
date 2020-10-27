<template>
<div class="container">
    <div class="p-5 mt-5 box-shadow bg-white bd-radius-5 w-75 mx-auto">
        <div class="w-100 mb-5" v-if="!user.conditions">
            <h2>Hi {{ user.username}},</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque dignissimos culpa quasi minima nobis sapiente fugiat libero. Laboriosam odit, accusantium, ducimus, praesentium fugit ea pariatur dolorem at magnam vitae facere.</p>
        </div>
        <div class="input-group d-flex mb-4">
            <input type="text" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="First Name" v-model="first_name">
            <input type="text" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="Last Name" v-model="last_name">
        </div>
        <div class="input-group d-flex mb-4">
            <input type="number" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="Age" v-model="age">
            <input type="number" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="Weight (Kg)" v-model="weight">
        </div>
        <div class="d-flex mb-3">
            <textarea name="" id="" cols="30" rows="10" placeholder="Disease History" class="w-50 m-2 p-2 bg-light-grey border bd-radius-5" v-model="disease_history"></textarea>
            <textarea name="" id="" cols="30" rows="10" placeholder="Family history About Disease" class="w-50 p-2 m-2 bg-light-grey border bd-radius-5" v-model="family_history"></textarea>
        </div>
        <div class="d-flex mb-4">
            <textarea name="" id="" rows="5" placeholder="Allergies (Seperated by commas)" class="w-100 p-2 m-2 bg-light-grey border bd-radius-5" v-model="allergies"></textarea>
        </div>
        <br>
        <p>Appointment Date & Time</p>
        <div class="input-group d-flex mb-4">
            <input type="date" class="form-control mr-4 bg-light-grey border bd-round pl-4" v-model="mydate">
            <input type="time" class="form-control mr-4 bg-light-grey border bd-round pl-4" v-model="time">
        </div>
        <br>
        <p class="mb-1 font-weight-bold">
            {{ doctor ? 'Doctor Picked ('+doctor.username+')' : 'Pickup a Doctor'}}
        </p>
        <div class="input-group mb-3 bg-light-grey">
            <input @keyup="search()" type="text" class="form-control bg-none" placeholder="Start typing to see suggestions" v-model="keywords">
            <div class="input-group-append">
                <span class="input-group-text material-icons">search</span>
            </div>
        </div>    
        <div class="w-100 overflow-auto bg-light-grey box-shadow pt-2 pb-2" style="max-height:300px" v-if="doctors.length > 0">
            <button @click="doctor = item, doctors = []" class="btn btn-block text-left hov bd-radius-0 bd-bottom mb-0 mt-0 pt-2 pb-2" v-for="(item, i) in doctors" :key="i" v-html="highlight(item)"></button>
        </div>    
        <div class="w-100 text-right mt-5">
            <button @click="makeAnAppointment()" class="btn btn-info pl-4 pr-4 box-shadow bd-round" :disabled="!doctor || !mydate || !time || !allergies || !disease_history || !family_history || !age || !weight || !first_name || !last_name">Make Appointment</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: "Q"
            },
            keywords: null,
            duplicate: [],
            doctor: null,
            mydate: null,
            time: null,
            allergies: null,
            disease_history: null,
            family_history: null,
            age: null,
            weight: null,
            first_name: null, last_name: null,
            doctors: []          
        }
    },
    methods: {
        makeAnAppointment() {
            let obj = {
                user: this.user,
                fname: this.first_name, lname: this.last_name,
                doctor: this.doctor,
                date: this.mydate,
                time: this.time,
                allergies: this.allergies,
                disease_history: this.disease_history,
                family_history: this.family_history,
                age: this.age,
                weight: this.weight
            }

            this.firebase_push_db({ ref: 'appointments', obj }, (res) => {
                this.alertmsg("Appointment Is been Made With Dr. " + this.doctor.name, "success")
            })             
        },
        highlight(str) {
            return 'Dr. ' + str.username.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            if(!this.keywords) {
                this.doctors = []
                return
            }
            let $this = this
            this.doctors = this.duplicate.filter(function(el) {
                return el.username.includes($this.keywords)
            })
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.user = res
                        console.log(this.user, 'my users...')
                    })
                }            
        }
        this.firebase_get("users", (res) => {
            if(res) {
                for(let i=0; i<res.length; i++) {
                    let doctor = res[i]
                    if(doctor.type == "doctor") {
                        this.duplicate.push(doctor)
                    }
                }
            }
        })                
    }    
}
</script>

<style>

</style>