<template>
<div class="container">
    <div class="w-100 bg-white box-shadow mt-5 pt-5 pb-5 pl-4 pr-4">
        <h4 class="text-center font-weight-normal">Share an update</h4>
        <div class="w-100 text-center mt-4">
            <button class="btn btn-primary box-shadow pl-5 pr-5 pt-2 pb-2 bd-round" @click="post = true">
                <span class=" d-flex align-items-center">
                    <span class="material-icons mr-2">control_point</span>
                    <span>Create A Post</span>
                </span>
            </button>
        </div>
        <div class="pt-4" v-if="post">
            <hr>
            <button class="btn btn-block text-right pb-0 mb-0" @click="post = false">
                <span class="material-icons">clear</span>
            </button>
            <div class="w-75">
                <h2 class="pt-4 pb-5 pl-4 pr-4">Post to the NewsFeed</h2>
                <div class="w-100 d-flex">
                    <button style="width:75px;height:75px;border-radius:50%" class="btn btn-warning text-white mr-4 flex-shrink-0 text-lg text-center font-dancing-script">{{user.username[0].toUpperCase()}}
                    </button>
                    <div class="w-100">
                        <div class="form-group w-100 p-2 border bg-light-grey">
                            <input type="text" class="form-control w-100 font-weight-bold bd-none bg-none" placeholder="Add a title (optional)" v-model="title">
                        </div>                        
                        <div class="form-group w-100 p-2 pb-4 border box-shadow" style="border-radius:25px 5px 5px 0px;">
                            <input type="text" class="form-control w-100 bd-none bg-none" placeholder="Share an update." v-model="content">
                            <div class="bd-top p-2" v-if="attach">
                                <div class="border d-inline-block position-relative">
                                    <img :src="attach" alt="" width="120px">
                                    <button @click="attach=null" class="btn btn-danger material-icons position-absolute p-2" style="border-radius:50%;bottom:-20px;right:-25px;">delete</button>                                
                                </div>
                            </div>
                        </div>     
                        <div class="w-100 d-flex justify-content-between">
                            <div>
                                <button v-if="!attach" @click="uploadImage()" class="btn material-icons border">attach_file</button>
                            </div>
                            <div>
                                <button @click="post = false" class="btn btn-outline-secondary pl-4 pr-4 mr-2 font-weight-bold">Cancel</button>
                                <button @click="postToNewsfeed()" class="btn btn-primary pl-4 pr-4 box-shadow font-weight-bold" :disabled="!title || !content">
                                    <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                    <span v-else>Post</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-100" v-if="allPosts && allPosts.length > 0">
        <div class="w-100  mt-5 p-4 bg-white box-shadow " v-for="(p, i) in allPosts" :key="i">
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                    <button style="width:75px;height:75px;border-radius:50%" class="btn btn-warning text-white mr-4 flex-shrink-0 text-lg text-center font-dancing-script">{{user.username[0].toUpperCase()}}
                    </button>
                </div>
                <p class="font-weight-bold">{{p.user.username}}</p>
            </div>
            <div class="w-100 mt-5">
                <p v-html="p.content"></p>
                <div class="w-50 m-auto">
                    <img v-if="p.attachment" :src="p.attachment" class="w-100 bd-radius-5 box-shadow" alt="">
                </div>
            </div>

            <div v-if="p.comments.length > 1" class="pl-5 pt-5">
                <p class="mb-5 d-flex align-items-center justify-content-end"><span class="material-icons mr-2">chat</span> <span>({{p.comments.length - 1}})</span></p>
                <div v-for="(c, j) in p.comments" :key="j">
                    <div class="d-flex align-items-center mb-4 pb-4 bd-bottom" v-if="c.content">
                        <div class="flex-shrink-0">
                            <button style="width:50px;height:50px;border-radius:50%" class="btn btn-info text-white mr-4 flex-shrink-0 text-md text-center font-dancing-script">{{c.user.username[0].toUpperCase()}}
                            </button>
                        </div>
                        <div>
                            <p class="font-weight-bold mb-0">{{c.user.username}}</p>
                            <p class="text-sm mt-0"><i>{{c.date}}</i></p>
                            <p>{{c.content}}</p>
        
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="w-100 mt-5">
                <div class="input-group mb-3 bd-round bg-light-grey d-flex align-items-center border">
                    <input type="text" class="form-control bg-none bd-none p-3" placeholder="Leave a comment..." v-model="comment">
                    <div class="input-group-append p-2">
                        <button @click="postComment(p)" class="btn btn-primary pl-4 pr-4 box-shadow bd-round" :disabled="!comment">Post</button>
                    </div>
                </div>                
            </div>
        </div>
    </div>
    <div class="w-100 p-5 text-center" v-else>
        <p class="w-100 p-5 text-center">No Post Yet!</p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            post: false,
            title: null,
            content: null,
            attach: null,
            loading: false,
            user: {
                username: "Q"
            },
            comment: null,
            allPosts: null
        }
    },
    methods: {
        uploadImage() {
            this.uploadImgFile((src) => {
                this.attach = src
            })
        },
        postComment(p) {
            let myComment = p.comments,
                newComment = {
                    user: this.user,
                    date: this.getDate(),
                    content: this.comment
                }
            p.comments.push(newComment)
            this.firebase_put_db({ ref: "posts/" + p.key, child: 'comments', obj: p.comments }, (res) => {
                this.alertmsg("Comment Added Succsessfully", "success")
            })            

        },
        postToNewsfeed() {
            let obj = {
                title: this.title,
                content: this.content,
                attachment: this.attach,
                user: this.user,
                date: this.getDate(),
                comments: [
                    { user: this.user, date: Date.now()}
                ]
            }
            this.loading = true
            this.content = null
            this.firebase_push_db({ ref: "posts", obj }, (res) => {
                this.alertmsg("Post Created Succsessfully", "success")
                this.loading = false
            })            
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.user = this.getCookie("mywebsite.registration")
                }            
        }
        this.firebase_get("posts", (res) => {
            if(res) {
                this.allPosts = res
                console.log(res, 'my response')
            }
        })        

    }
}
</script>

<style>

</style>