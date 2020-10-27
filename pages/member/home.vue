<template>
<div>
    <site-header @tab="tab_changed($event)" />
    <member-home v-if="tab=='HOME'" />
    <member-myhealth v-else-if="tab=='MYHEALTH'" />
    <member-conditions v-if="tab=='CONDITIONS'" />
    <member-treatment v-else-if="tab=='TREATMENTS'" />
    <member-symptoms v-else-if="tab=='SYMPTOMS'" />
    <make-appointment v-else-if="tab=='MAKE AN APPOINTMENT'" />
    <site-footer />
</div>
</template>

<script>
import site_header from '@/components/website/member-header.vue'
import site_footer from '@/components/website/footer.vue'
import member_conditions from '@/components/member/member-conditions.vue'
import member_treatment from '@/components/member/member-treatment.vue'
import member_symptoms from '@/components/member/member-symptoms.vue'
import member_home from '@/components/member/member-home.vue'
import member_myhealth from '@/components/member/member-myhealth.vue'
import make_appointment from '@/components/member/make-appointment.vue'

export default {
    layout: "member",
    components: {
        "site-header": site_header,
        "member-conditions": member_conditions,
        "site-footer": site_footer,
        "member-treatment": member_treatment,
        "member-symptoms": member_symptoms,
        "member-home": member_home,
        "member-myhealth": member_myhealth,
        "make-appointment": make_appointment,
    },
    data() {
        return {
            tab: 'HOME'
        }
    },
    methods: {
        tab_changed(tab) {
            this.tab = tab
        }
    }
}
</script>

<style>

</style>