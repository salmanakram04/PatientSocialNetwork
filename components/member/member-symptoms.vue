<template>
<div class="container p-4">
    <br>
    <h3 class="font-weight-normal ls-1 mb-4">Symptoms</h3>
    <div class="border w-100 p-3 bg-white">
        <p><span class="text-info font-weight-bold">750000+</span> patients with <span class="text-info font-weight-bold">2,800+</span> conditions are sharing about their symptoms and how they manage them. See what they’re saying about yours…</p>
        <div class="mb-4">
            <div class="input-group mb-3 border bd-radius-5">
                <input type="text" class="form-control bd-none" placeholder="Find my Symptoms">
                <div class="input-group-append">
                <span class="input-group-text material-icons bg-none bd-none">search</span>
                </div>
            </div>            
        </div>
        <br>
        <h4>Look from Patients like you</h4>
        <p>Check out the most commonly reported symptoms across all conditions:</p>
        <div class="w-100">
            <div class="w-100 d-flex align-items-center mb-3" v-for="(symptom, i) in symptoms" :key="i">
                <div class="w-25 d-inline">
                    <button class="btn">{{symptom.title}}</button>
                </div>
                <div class="w-50">
                    <div class="progress" style="height:25px;">
                        <div class="progress-bar bg-danger" :style="symptom.style"></div>
                    </div>                
                </div>
                <button class="btn text-md">{{symptom.style.width}}</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            symptoms: [
                { title: "Fatigue", style: {width: "25%" }},
                { title: "Anxious mood", style: {width: "24%" }},
                { title: "Pain", style: {width: "21%" }},
                { title: "Depressed mood", style: {width: "24%" }},
                { title: "Stress", style: {width: "5%" }},
                { title: "New Symptom", style: {width: "50%" }},
            ]
        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>

<style>

</style>