﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class TagRepository : ITagRepository
    {
        private ApplicationDbContext _context;

        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Tag> Get()
        {
            return _context.Tag
                .OrderBy(t => t.Name)
                .ToList();
        }
        public Tag GetById(int id)
        {
            return _context.Tag
                .Where(t => t.Id == id)
                .FirstOrDefault();
        }
        //public List<Tag> GetByPostId(int id)
        //{
        //return _context.Tag.Where(t => t.Posts.Any(p => p.Id == id)).ToList();
        //}
        public void Add(Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
        }
        public void Update(Tag tag)
        {
            _context.Entry(tag).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var tag = GetById(id);
            var middleTable = _context.PostTag.Where(pt => pt.TagId == tag.Id).ToList();
            _context.PostTag.RemoveRange(middleTable);
            _context.Tag.Remove(tag);
            _context.SaveChanges();
        }
    }
}
