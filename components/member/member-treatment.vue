<template>
<div class="container p-4">
    <br>
    <h3 class="font-weight-normal ls-1 mb-4">Treatments</h3>
    <div class="border w-100 p-3 bg-white">
        <div class="mb-4 bd-bottom">
            <div class="form-group w-50 mb-4">
                <input class="form-control bd-radius-5" placeholder="Start typing to see suggestions">
            </div>        
        </div>
        <h4 class="font-weight-bold">Community treatment reports</h4>
        <p>Click on a treatment to see what patients have to say about side-effects, perceived effectiveness, advice, burden, dosages and cost .</p>
        <br>
        <div class="d-flex flex-wrap" v-if="treatments.length > 0">
            <div v-for="(item, i) in treatments" :key="i" class="w-50 p-3">
                <h3>{{item.title}}</h3>
                <button class="btn w-100 d-flex justify-content-between bd-bottom bd-radius-0">
                    <span class="text-sm text-dark font-weight-bold">Treatments</span>
                    <span class="text-sm text-dark font-weight-bold">Patients</span>
                </button>
                <button class="btn w-100 text-left bd-bottom text-primary d-flex justify-content-between bd-radius-0" v-for="(nested, j) in item.symptoms" :key="j">
                    <span>{{nested}}</span>
                    <span>0</span>
                </button>
            </div>
        </div>
        <div class="w-100" v-else>
            <p class="w-100 text-center text-sm">
                Please wait...
            </p>
        </div>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            treatments: []
        }
    },
    methods: {

    },
    mounted() {
        this.firebase_get("treatments", (res) => {
            if(res) {
                for(let i=0; i<res.length; i++) {
                    let symptoms = res[i].symptoms.split(",")
                    this.treatments.push({
                        title: res[i].title,
                        symptoms
                    })
                }
            }
            console.log(this.treatments, 'my response')
        })
    }
}
</script>

<style>

</style>