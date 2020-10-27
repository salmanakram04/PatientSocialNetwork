<template>
<div class="container p-4">
    <br>
    <h3 class="font-weight-normal ls-1 mb-4">Featured Conditions at <b>CFBPSN</b></h3>
    <div class="border w-100 p-3 bg-white">
        <div class="mb-4 bd-bottom">
            <div class="form-group w-50 mb-4">
                <input class="form-control bd-radius-5" placeholder="Look up for conditions">
            </div>        
        </div>
        <h4>Members are tracking more than 2,800 conditions on CFBPSN. See what they’re saying about yours...</h4>
        <br>
        <div class="d-flex flex-wrap" v-if="condition.length > 0">
            <div v-for="(item, i) in condition" :key="i" class="w-50 p-3">
                <h3>{{item.title}}</h3>
                <a href="javascript:void(0)" v-for="(nested, j) in item.symptoms" :key="j">{{nested}},</a>
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
            condition: []
        }
    },
    methods: {

    },
    mounted() {
        this.firebase_get("conditions", (res) => {
            if(res) {
                for(let i=0; i<res.length; i++) {
                    let symptoms = res[i].symptoms.split(",")
                    this.condition.push({
                        title: res[i].title,
                        symptoms
                    })
                }
            }
        })
    }
}
</script>

<style>

</style>