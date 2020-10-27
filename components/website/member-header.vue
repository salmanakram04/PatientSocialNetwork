<template>
<div class="container p-0">
    <div class="w-100 text-right pt-4 pb-4">
        <button class="btn text-sm bd-radius-0 bd-right">
            <span class="d-flex align-items-center">
                <span class="material-icons mr-2 text-primary">face</span>
                <span class="text-dark font-weight-bold"> {{ account.type == 'doctor' ? 'Dr.' : ''}} {{account.username}}</span><br>
            </span>
        </button>
        <button @click="logout()" class="btn text-sm">Logout</button>
    </div>
    <div class="d-flex justify-content-between align-items-center pl-3 pr-3 pt-3">
        <div class="align-self-center">
            <v-logo />
        </div>        
        <div class="input-group mb-3 w-50 align-self-center border bd-radius-5">
            <input type="text" class="form-control bd-none" placeholder="Search">
            <div class="input-group-append bg-none">
                <span class="input-group-text material-icons bg-none bd-none">search</span>
            </div>
        </div> 
        <div class="text-right header-right align-self-center">
            <div class="lg-screen d-flex align-items-center">
                <button @click="open_dropdown($event, fav_list)" class="btn d-flex align-items-center btn-hov dropdown-btn"><span class="material-icons text-danger dropdown-btn">favorite_border</span><span class="small ml-1 font-weight-bold dropdown-btn"> 1</span></button>
                <button @click="open_dropdown($event, email_list)" class="btn material-icons btn-hov dropdown-btn">mail_outline</button>
                <button @click="open_dropdown($event, notification_list)" class="btn material-icons btn-hov dropdown-btn">notifications_none</button>
            </div>
            <button @click="open_menu($event)" class="btn btn-hov menu d-none material-icons dropdown-btn p-4">menu</button>
        </div>
    </div>
    <div class="w-100 text-center mt-2 bd-bottom">
        <button @click="change_tab(i, item.title)" class="btn btn-hov mr-2" :class="active == i ? 'font-weight-bold bd-bottom-blue' : ''" v-for="(item, i) in links" :key="i">{{item.title}}</button>
    </div>
</div>
</template>

<script>
import dropdown_list from './dropdown-list.vue'
import vue from 'vue'
import $ from 'jquery'
import JSON from '@/assets/json/website.json'
import v_logo from './v-logo.vue'
export default {
    components: {
        dropdown_list,
        "v-logo": v_logo
    },
    data() {
        return {
            active: 0,
            visible: true,
            links: [],
            fav_list: [
                { title: "MonthlyMe Check-in", class: "text-dark border text pl-3 pr-3 bd-radius-0 mr-4", href: "./login"},
                { title: "Doctor Visit Guide", class: "btn-primary box-shadow bd-radius-0 mr-4", href: "./join"},
                { title: "Treatment Check-in", class: "btn-primary box-shadow bd-radius-0 mr-4", href: "./join"},
            ],
            email_list: [
                { title: "<h5 class='text-dark font-weight-bold'>You do not have any new Messages</h5>", class: "text-dark border text pl-3 pr-3 bd-radius-0 mr-4", href: "./login"},
            ],
            notification_list: [
                { title: "No New notifications", class: "text-dark border text pl-3 pr-3 bd-radius-0 mr-4", href: "./login"},
            ],
            account: {}
        }
    },
    methods: {
        logout() {
            this.setCookie("mywebsite.registration", {})
            this.$router.push("/")
        },
        change_tab(i, name) {
            this.active=i
            this.$emit("tab", name)
        },
        dropdown(e, list) {
            let { html, instance } = this.component(dropdown_list, { e, list, width: 250 } )
            document.body.append(html)
        },
        open_dropdown(e, list) {
            let { html, instance } = this.component(dropdown_list, { e, list, width: 250, back: false } )
            document.body.append(html)
        },
        component(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return {
                html: instance.$el,
                instance
            }
        },
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            this.account = this.getCookie("mywebsite.registration")
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.account = res
                        if(this.account.type == "doctor") {
                           this.links = [
                                { title: "HOME"},
                                { title: "MY APPOINTMENTS"}
                            ]
                        }
                        else {
                           this.links = [
                                { title: "HOME"},
                                { title: "MYHEALTH"},
                                { title: "CONDITIONS"},
                                { title: "TREATMENTS"},
                                { title: "SYMPTOMS"},
                                { title: "MAKE AN APPOINTMENT"},
                            ]
                        }
                    })
                }                
        }
    }

}
</script>

<style>
.blue-bd-bottom-lg {
    border-bottom: 0.25rem solid #007BFF;
}
@media only screen and (max-width: 1170px) {
  .header-right .lg-screen {
    display: none;
  }
  .header-right .menu {
      display: inline-block !important;
  }
}
</style>