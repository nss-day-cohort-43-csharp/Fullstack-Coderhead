﻿using System.Collections.Generic;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public interface IPostRepository
    {
        List<PostSummary> Get();
        Post GetById(int id);
        List<ReactionCount> GetReactionCounts(int postId);
        void Add(Post post);
        void Update(Post post);
        void Delete(int id);
        List<Post> GetByUserId(int id);
        void AddTagToPost(PostTag postTag);
    }
}