import Vue from 'vue'
const path = require('path')
const moment = require('moment')
const mimetype = ["image/jepg", "image/png", "image/jpg", "image/svg+xml"]
import $ from 'jquery'
Vue.mixin({
    methods:{
        setCookie(name,value,days) {
            value = JSON.stringify(value)
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        },
        getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length,c.length));
            }
            return null;
        },
        eraseCookie(name) {   
            document.cookie = name+'=; Max-Age=-99999999;';  
        },
        
        format_url(str) {
            if(str.split(" ").length > 1) {
                return str.split(" ").join("-").toLowerCase()
            } else {
                return str.toLowerCase()
            }
        },
        format_sw(sw) {
            sw.path = JSON.parse(sw.path)
            console.log(sw.path, 'path')
            let file_type = sw.path[0].mimetype,
                thumbnail = mimetype.includes(file_type) ? sw.path[0].filename : sw.path[1].filename,
                file = !mimetype.includes(file_type) ? sw.path[0].filename : sw.path[1].filename,
                now = this.date(),
                created = JSON.parse(sw.date),
                start = moment([created.year, created.month, created.day]),
                end = moment([now.year, now.month, now.day]),
                date = start.from(end),
                title = sw.title,
                description = sw.description,
                download = sw.download,
                id = sw.id
            
            return {
                id, date, title, description, thumbnail, file, download
            }
        },
        date_moment(date) {
            let now = this.date(),
                created = JSON.parse(date),
                start = moment([created.year, created.month, created.day]),
                end = moment([now.year, now.month, now.day])
            return start.from(end)
        },
        date() {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            return {
                year, month, day
            }
        },
        alertmsg(msg, color="primary") {
            let button = $("<button>")
        
            button.addClass('btn bg-dark-2 bd-round box-shadow pl-4 pr-4 pt-2 pb-2 text-sm animate__animated  animate__fadeInUp animate__faster d-flex align-items-center')
            button.css({
                position: "fixed",
                bottom: "25px", left: "25px"
            })
            button.html(`<span class='material-icons mr-2 text-${color}'>info</span><span class="text-${color}">${msg}</span>`)
            $("body").append(button)
        
            setTimeout(() => {
                button.removeClass("animate__fadeInUp").addClass("animate__zoomOut")
                setTimeout(() => {
                    button.remove()            
                }, 500);
            }, 2000);
        },
        getDate() {
            var d = new Date();
    
            var date = d.getDate();
            var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
            var year = d.getFullYear();                
            return date + "/" + month + "/" + year;            
        },
        uploadImgFile(callback) {
            let input = $("<input>")
            input.attr("type", "file")
            $(document.body).append(input)
            input.addClass("display-none")
            input.click()
            input.change(function(e) {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();        
                    reader.onload = function(e) {
                        console.log(e, 'my target')
                        callback(e.target.result)
                    }                
                    reader.readAsDataURL(this.files[0]);
                }
                $(this).remove()
            })
        },
    }
})